import { toNano } from '@ton/core';
import { TallyContract } from '../wrappers/TallyContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  const tallyContract = provider.open(await TallyContract.fromInit());

  await tallyContract.send(
    provider.sender(),
    {
      value: toNano('0.05'),
    },
    {
      $$type: 'Deploy',
      queryId: 0n,
    },
  );

  await provider.waitForDeploy(tallyContract.address);

  // run methods on `tallyContract`
}
