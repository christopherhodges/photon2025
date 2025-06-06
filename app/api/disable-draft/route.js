import { draftMode } from 'next/headers';

export async function GET(request) {
  console.log(request);
  draftMode().disable();
  return new Response('Draft mode is disabled');
}
