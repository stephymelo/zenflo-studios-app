const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY || '';

export async function submitForm(data: Record<string, string>): Promise<boolean> {
  if (!WEB3FORMS_KEY) {
    console.warn('Missing REACT_APP_WEB3FORMS_KEY — form not sent. Get a free key at https://web3forms.com');
    return true;
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        to: 'hello@zenflostudios.com',
        ...data,
      }),
    });
    const json = await res.json();
    return json.success === true;
  } catch {
    console.error('Form submission failed');
    return false;
  }
}
