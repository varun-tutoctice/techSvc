
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import { TechSvcController } from '../../controllers';

import { TechRepository } from '../../repositories';
import { Tech } from '../../models';


describe('TechSvcController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<TechRepository>;
  let attachment: StubbedInstanceWithSinonAccessor<Tech>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new TechSvcController(repository);
      const testObj = new Tech();
      testObj.id = '123';
      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });




  describe('count', () => {

    it('counts ', async () => {

      const controller = new TechSvcController(repository);
      repository.stubs.count.resolves();
      const result = await controller.count();
      expect(result).to.empty;

    });

  });




  function givenStubbedRepository() {
    repository = createStubInstance(TechRepository);
  }

});


