const MC_BASE = 'https://zenflostudios.us19.list-manage.com/subscribe/post-json';
const MC_U = '28548fe192637f2b4931a3e65';
const MC_ID = 'db8fd45884';

// Same audience, two Mailchimp forms: the general newsletter one and the courses
// one — signing up through the course form is what marks subscribers as course leads.
const MC_FORM_IDS = {
  newsletter: '00683be3f0',
  course: '006f3be3f0',
};

// Optional numeric Mailchimp tag id for "course" signups, applied on top of the
// course form. To get it: Audience → Signup forms → Embedded forms → pick the
// "course" tag, then copy the value of the hidden <input name="tags"> in the
// generated code. Leave empty to skip.
export const COURSE_TAG_ID = '';

export interface SubscribeResult {
  ok: boolean;
  msg: string;
}

// Mailchimp's post-json endpoint is JSONP-only (no CORS), so we load it as a script.
export function subscribeToNewsletter(opts: {
  email: string;
  fname?: string;
  lname?: string;
  company?: string;
  tags?: string;
  form?: keyof typeof MC_FORM_IDS;
}): Promise<SubscribeResult> {
  return new Promise((resolve) => {
    const cb = `mcJsonp${Date.now()}${Math.floor(Math.random() * 1e4)}`;
    const params = new URLSearchParams({
      u: MC_U,
      id: MC_ID,
      f_id: MC_FORM_IDS[opts.form || 'newsletter'],
      EMAIL: opts.email,
      c: cb,
    });
    if (opts.fname) params.set('FNAME', opts.fname);
    if (opts.lname) params.set('LNAME', opts.lname);
    if (opts.company) params.set('COMPANY', opts.company);
    if (opts.tags) params.set('tags', opts.tags);

    const script = document.createElement('script');
    let settled = false;
    const finish = (result: SubscribeResult) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      delete (window as unknown as Record<string, unknown>)[cb];
      script.remove();
      resolve(result);
    };
    // Mailchimp occasionally returns malformed JSONP (e.g. two concatenated
    // payloads when rate-limiting repeat attempts), which throws a parse error
    // and never invokes the callback — without this timeout the form would hang.
    const timer = window.setTimeout(() => {
      finish({
        ok: false,
        msg: 'Mailchimp could not process this signup — if you tried several times, wait about 5 minutes and try once more.',
      });
    }, 10000);
    (window as unknown as Record<string, unknown>)[cb] = (data: { result: string; msg: string }) => {
      finish({
        ok: data.result === 'success',
        msg: (data.msg || '').replace(/^\d+\s*-\s*/, ''),
      });
    };
    script.onerror = () => {
      finish({ ok: false, msg: 'Something went wrong — please try again in a minute.' });
    };
    script.src = `${MC_BASE}?${params.toString()}`;
    document.body.appendChild(script);
  });
}
