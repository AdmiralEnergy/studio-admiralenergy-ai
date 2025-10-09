// src/app/api/order/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Order data interface matching the form
interface OrderData {
  name: string;
  email: string;
  website: string;
  primaryService: string;
  brandColors: string;
  voiceTone: string;
  offerLine: string;
  sku?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// Basic validation helper
function validateOrderData(data: any): OrderData | null {
  const required = ['name', 'email', 'primaryService'];
  
  for (const field of required) {
    if (!data[field] || typeof data[field] !== 'string' || data[field].trim().length === 0) {
      return null;
    }
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return null;
  }
  
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    website: data.website?.trim() || '',
    primaryService: data.primaryService.trim(),
    brandColors: data.brandColors?.trim() || '',
    voiceTone: data.voiceTone?.trim() || '',
    offerLine: data.offerLine?.trim() || '',
    sku: data.sku?.trim() || 'medspa_24hr',
    utm_source: data.utm_source?.trim() || '',
    utm_medium: data.utm_medium?.trim() || '',
    utm_campaign: data.utm_campaign?.trim() || ''
  };
}

// POST handler for order processing
export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json();
    const orderData = validateOrderData(rawData);
    
    if (!orderData) {
      return NextResponse.json(
        { error: 'Invalid order data. Please check required fields.' },
        { status: 400 }
      );
    }
    
    // Log order for debugging (remove in production)
    console.log('Order received:', {
      email: orderData.email,
      sku: orderData.sku,
      timestamp: new Date().toISOString()
    });
    
    // ===========================================
    // OPTIONAL: Forward to CRM/Email Service
    // ===========================================
    // Uncomment and configure based on your CRM:
    
    /*
    // Example: Forward to external CRM webhook
    try {
      const crmResponse = await fetch(process.env.CRM_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CRM_API_KEY}`
        },
        body: JSON.stringify({
          contact: {
            name: orderData.name,
            email: orderData.email,
            website: orderData.website,
          },
          order: {
            sku: orderData.sku,
            package: 'Medspa Content Accelerator',
            value: 249,
            currency: 'USD'
          },
          details: {
            primaryService: orderData.primaryService,
            brandColors: orderData.brandColors,
            voiceTone: orderData.voiceTone,
            offerLine: orderData.offerLine
          },
          attribution: {
            utm_source: orderData.utm_source,
            utm_medium: orderData.utm_medium,
            utm_campaign: orderData.utm_campaign
          },
          timestamp: new Date().toISOString()
        })
      });
      
      if (!crmResponse.ok) {
        console.error('CRM webhook failed:', crmResponse.status);
        // Continue processing - don't fail the order
      }
    } catch (crmError) {
      console.error('CRM integration error:', crmError);
      // Continue processing - don't fail the order
    }
    */
    
    /*
    // Example: Send notification email via SendGrid/Resend
    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: 'orders@admiralenergy.ai' }],
            subject: `New Medspa Order: ${orderData.name}`
          }],
          from: { email: 'studio@admiralenergy.ai' },
          content: [{
            type: 'text/html',
            value: `
              <h2>New Medspa Content Order</h2>
              <p><strong>Customer:</strong> ${orderData.name} (${orderData.email})</p>
              <p><strong>Website:</strong> ${orderData.website}</p>
              <p><strong>Primary Service:</strong> ${orderData.primaryService}</p>
              <p><strong>Brand Colors:</strong> ${orderData.brandColors}</p>
              <p><strong>Voice/Tone:</strong> ${orderData.voiceTone}</p>
              <p><strong>Offer Line:</strong> ${orderData.offerLine}</p>
              <hr>
              <p><strong>UTM Tracking:</strong> ${orderData.utm_source} / ${orderData.utm_medium} / ${orderData.utm_campaign}</p>
              <p><strong>Order Time:</strong> ${new Date().toLocaleString()}</p>
            `
          }]
        })
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue processing - don't fail the order
    }
    */
    
    // Return success response
    return NextResponse.json({
      success: true,
      orderId: `medspa_${Date.now()}`, // Simple order ID generation
      message: 'Order processed successfully',
      data: {
        email: orderData.email,
        sku: orderData.sku,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Order processing error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again or contact support.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// GET handler for health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'order-api',
    timestamp: new Date().toISOString()
  });
}