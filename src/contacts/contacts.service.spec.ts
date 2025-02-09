import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { NotFoundException } from '@nestjs/common';

describe('ContactsService', () => {
  let service: ContactsService;
  let repo: Repository<Contact>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getRepositoryToken(Contact),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    repo = module.get<Repository<Contact>>(getRepositoryToken(Contact));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a contact', async () => {
      const createContactDto: CreateContactDto = {
        name: 'John Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
      };

      const contact = new Contact();
      Object.assign(contact, createContactDto);

      mockRepository.create.mockReturnValue(contact);
      mockRepository.save.mockResolvedValue({ ...contact });

      const result = await service.create(createContactDto);

      expect(result).toEqual({ ...contact });
      expect(mockRepository.create).toHaveBeenCalledWith(createContactDto);
      expect(mockRepository.save).toHaveBeenCalledWith(contact);
    });
  });

  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      const expectedContacts = [
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

      mockRepository.findAndCount.mockResolvedValue([expectedContacts, 1]);

      const result = await service.findAll(1, 10);
      expect(result).toEqual({
        items: expectedContacts,
        total: 1,
        page: 1,
        limit: 10
      });
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        order: { createdAt: 'DESC' }
      });
    });
  });

  describe('findOne', () => {
    it('should return a single contact', async () => {
      const expectedContact = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        homeNumber: '',
        address: '',
        createdAt: new Date(),
        recordModifiedAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(expectedContact);

      const result = await service.findOne(1);
      expect(result).toEqual(expectedContact);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException for non-existent contact', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('update', () => {
    it('should update a contact', async () => {
      const updateContactDto: UpdateContactDto = {
        name: 'Jane',
      };

      const existingContact = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        homeNumber: '',
        address: '',
        createdAt: new Date(),
        recordModifiedAt: new Date(),
      };

      const updatedContact = {
        ...existingContact,
        ...updateContactDto,
      };

      mockRepository.findOne.mockResolvedValue(existingContact);
      mockRepository.save.mockResolvedValue(updatedContact);

      const result = await service.update(1, updateContactDto);
      expect(result).toEqual(updatedContact);
    });

    it('should throw NotFoundException when updating non-existent contact', async () => {
      const updateContactDto: UpdateContactDto = {
        name: 'Jane',
      };

      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, updateContactDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a contact', async () => {
      const existingContact = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        homeNumber: '',
        address: '',
        createdAt: new Date(),
        recordModifiedAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(existingContact);
      mockRepository.remove.mockResolvedValue(existingContact);

      const result = await service.remove(1);
      expect(result).toEqual(existingContact);
      expect(mockRepository.remove).toHaveBeenCalledWith(existingContact);
    });

    it('should throw NotFoundException when deleting non-existent contact', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
