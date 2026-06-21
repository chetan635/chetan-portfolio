async function testEmailJS() {
  const SERVICE_ID = "service_5wio7xy";
  const TEMPLATE_ID = "template_69qw9ip";
  const PUBLIC_KEY = "7XR6F_Aev9GKKtpw5";

  console.log("Sending test request to EmailJS...");
  
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          from_name: "Test Sender",
          name: "Test Sender",
          from_email: "test@example.com",
          email: "test@example.com",
          message: "This is a diagnostic message to test the EmailJS API config.",
        },
      }),
    });

    const status = response.status;
    const body = await response.text();
    console.log(`Response Status: ${status}`);
    console.log(`Response Body: ${body}`);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testEmailJS();
