import { toNano } from '@ton/core';
import { TallyContract } from '../wrappers/TallyContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  const tallyContract = provider.open(await TallyContract.fromInit(513327n));

  const counter = await tallyContract.getCounter();

  const id = await tallyContract.getId();

  console.log(`Counter: ${counter}; Id - ${id}`);
}
