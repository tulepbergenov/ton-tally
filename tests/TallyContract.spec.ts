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

    tallyContract = blockchain.openContract(await TallyContract.fromInit());

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
});
