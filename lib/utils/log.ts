type LogStatus = 'ok' | 'fail';

type LogFields = {
  event: string;
  request_id: string;
  status: LogStatus;
  [key: string]: unknown;
};

export function logEvent(fields: LogFields): void {
  const line = JSON.stringify(fields);
  if (fields.status === 'fail') {
    console.error(line);
  } else {
    // eslint-disable-next-line no-console
    console.log(line);
  }
}

export function emailDomain(email: string): string {
  const at = email.lastIndexOf('@');
  return at === -1 ? 'unknown' : email.slice(at + 1).toLowerCase();
}
