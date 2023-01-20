import '~tests/setup/dotenv';

import { createDatabase } from '~tests/setup/setup';

async function handler(): Promise<void> {
  await createDatabase();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
handler();
