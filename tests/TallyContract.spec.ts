import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { TallyContract } from '../wrappers/TallyContract';
import '@ton/test-utils';

describe('TallyContract', () => {
  let blockchain: Blockchain;
  let deployer: SandboxContract<TreasuryContract>;
  let tallyContract: SandboxContract<TallyContract>;

  beforeEach(async () => {
    blockchain = await Blockchain.create();

    tallyContract = blockchain.openContract(await TallyContract.fromInit(1000n));

    deployer = await blockchain.treasury('deployer');

    const deployResult = await tallyContract.send(
      deployer.getSender(),
      {
        value: toNano('0.05'),
      },
      {
        $$type: 'Deploy',
        queryId: 0n,
      },
    );

    expect(deployResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: tallyContract.address,
      deploy: true,
      success: true,
    });
  });

  it('should deploy', async () => {
    // the check is done inside beforeEach
    // blockchain and tallyContract are ready to use
  });

  it('should increase', async () => {
    const counterBefore = await tallyContract.getCounter();

    console.log('counter state initial', counterBefore);

    await tallyContract.send(
      deployer.getSender(),
      {
        value: toNano('0.02'),
      },
      'increment',
    );

    const counterAfter = await tallyContract.getCounter();

    console.log('counter state after increment', counterAfter);

    await tallyContract.send(
      deployer.getSender(),
      {
        value: toNano('0.02'),
      },
      'decrement',
    );

    const counterAfterDecrement = await tallyContract.getCounter();

    console.log('counter state after decrement', counterAfterDecrement);

    expect(counterBefore).toBeLessThan(counterAfter);
  });

  it('should increase with amount', async () => {
    const counterBefore = await tallyContract.getCounter();

    const amount = 5n;

    console.log('counter state initial', counterBefore);

    await tallyContract.send(
      deployer.getSender(),
      {
        value: toNano('0.02'),
      },
      {
        $$type: 'Add',
        amount: amount,
      },
    );

    const counterAfter = await tallyContract.getCounter();

    console.log('counter state after add message', counterAfter);

    expect(counterBefore).toBeLessThan(counterAfter);
  });
});
