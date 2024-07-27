import { toNano } from '@ton/core';
import { TallyContract } from '../wrappers/TallyContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  const tallyContract = provider.open(await TallyContract.fromInit(513327n));

  await tallyContract.send(
    provider.sender(),
    { value: toNano('0.02') },
    {
      $$type: 'Add',
      amount: 5n,
    },
  );
}
