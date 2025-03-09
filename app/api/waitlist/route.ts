// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const { email, productInterest } = await request.json();

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient();

    // Check if email already exists
    const { data: existingEntry } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .single();

    if (existingEntry) {
      // Update existing entry with new product interest
      const { error: updateError } = await supabase
        .from("waitlist")
        .update({
          product_interest: productInterest,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingEntry.id);

      if (updateError) throw updateError;

      return NextResponse.json({
        success: true,
        message: "Thanks for your continued interest!",
      });
    }

    // Insert new entry
    const { error: insertError } = await supabase.from("waitlist").insert({
      email,
      product_interest: productInterest,
      created_at: new Date().toISOString(),
    });

    if (insertError) throw insertError;

    // Send confirmation email if Resend is configured
    if (resend) {
      await sendConfirmationEmail(email, productInterest);
    }

    return NextResponse.json({
      success: true,
      message: "You've been added to our waitlist!",
    });
  } catch (error) {
    console.error("Error processing waitlist request:", error);

    // Check for duplicate error code from Supabase
    const supabaseError = error as any;
    if (supabaseError?.code === "23505") {
      return NextResponse.json({
        success: true,
        message: "You're already on our waitlist!",
      });
    }

    return NextResponse.json(
      { error: "Failed to join waitlist. Please try again later." },
      { status: 500 }
    );
  }
}

/**
 * Send a confirmation email to the user
 */
async function sendConfirmationEmail(
  email: string,
  productInterest: string
): Promise<void> {
  if (!resend) return;

  try {
    const productNames: Record<string, string> = {
      churn: "Churn Shield",
      cart: "Cart Rescue AI",
    };

    const productName =
      productNames[productInterest] || "our upcoming products";

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "waitlist@niafusion.com",
      to: email,
      subject: `You're on the waitlist for ${productName}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6d28d9;">You're on the waitlist!</h1>
          <p>Thanks for joining the waitlist for ${productName}. We're excited to have you on board!</p>
          <p>We'll keep you updated on our progress and let you know as soon as we're ready for beta testing.</p>
          <p>In the meantime, feel free to check out our website for more information about our products.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">The Niafusion Team</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // Don't throw - email sending should not block the waitlist signup
  }
}
