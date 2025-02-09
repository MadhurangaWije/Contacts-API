import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

describe('ContactsController', () => {
  let controller: ContactsController;

  const mockContactsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: ContactsService,
          useValue: mockContactsService,
        },
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new contact', async () => {
      const createContactDto: CreateContactDto = {
        name: 'John Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
      };

      const expectedResult: Contact = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        homeNumber: '',
        address: '',
        createdAt: new Date(),
        recordModifiedAt: new Date(),
      };

      mockContactsService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createContactDto);
      expect(result).toEqual(expectedResult);
      expect(mockContactsService.create).toHaveBeenCalledWith(createContactDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      const expectedResult: Contact[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          mobileNumber: '1234567890',
          homeNumber: '',
          address: '',
          createdAt: new Date(),
          recordModifiedAt: new Date(),
        },
      ];

      mockContactsService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(1, 10);
      expect(result).toEqual(expectedResult);
      expect(mockContactsService.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a single contact', async () => {
      const expectedResult: Contact = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        homeNumber: '',
        address: '',
        createdAt: new Date(),
        recordModifiedAt: new Date(),
      };

      mockContactsService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(1);
      expect(result).toEqual(expectedResult);
      expect(mockContactsService.findOne).toHaveBeenCalledWith(1);
    });

    it('should handle not found contact', async () => {
      mockContactsService.findOne.mockResolvedValue(null);

      const result = await controller.findOne(999);
      expect(result).toBeNull();
      expect(mockContactsService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should update a contact', async () => {
      const updateContactDto: UpdateContactDto = {
        name: 'Jane Doe',
      };

      const expectedResult: Contact = {
        id: 1,
        name: 'Jane Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        homeNumber: '',
        address: '',
        createdAt: new Date(),
        recordModifiedAt: new Date(),
      };

      mockContactsService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(1, updateContactDto);
      expect(result).toEqual(expectedResult);
      expect(mockContactsService.update).toHaveBeenCalledWith(1, updateContactDto);
    });

    it('should handle updating non-existent contact', async () => {
      const updateContactDto: UpdateContactDto = {
        name: 'Jane Doe',
      };

      mockContactsService.update.mockResolvedValue(null);

      const result = await controller.update(999, updateContactDto);
      expect(result).toBeNull();
      expect(mockContactsService.update).toHaveBeenCalledWith(999, updateContactDto);
    });
  });

  describe('remove', () => {
    it('should delete a contact', async () => {
      const expectedResult: Contact = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        homeNumber: '',
        address: '',
        createdAt: new Date(),
        recordModifiedAt: new Date(),
      };

      mockContactsService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(1);
      expect(result).toEqual(expectedResult);
      expect(mockContactsService.remove).toHaveBeenCalledWith(1);
    });

    it('should handle deleting non-existent contact', async () => {
      mockContactsService.remove.mockResolvedValue(null);

      const result = await controller.remove(999);
      expect(result).toBeNull();
      expect(mockContactsService.remove).toHaveBeenCalledWith(999);
    });
  });
});
