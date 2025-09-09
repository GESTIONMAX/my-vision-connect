require('dotenv').config({ path: '../.env' });
const Airtable = require('airtable');
const { PrismaClient } = require('@prisma/client');

// Configuration Airtable
// Utilisation du Personal Access Token (PAT) Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || 'pat6Ipg6brWdZAG2K.a78ab830b351b7400dfd1144d92b96caf38f19105e97cfce3818de0809897759';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appVH6EitfYVkeG9S';

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// Import functions for each model
async function importCategories() {
  console.log('Importing categories...');
  
  try {
    // Fetch categories from Airtable
    const records = await base('Categories').select().all();
    console.log(`Found ${records.length} categories in Airtable`);
    
    // Map and import each category
    for (const record of records) {
      const fields = record.fields;
      const category = {
        name: fields.Name,
        slug: fields.Slug || fields.Name.toLowerCase().replace(/\s+/g, '-'),
        description: fields.Description || null,
        parentId: fields.ParentCategory ? fields.ParentCategory[0] : null
      };
      
      // Check if category already exists
      const existingCategory = await prisma.category.findUnique({
        where: { slug: category.slug }
      });
      
      if (existingCategory) {
        console.log(`Category ${category.name} already exists, updating...`);
        await prisma.category.update({
          where: { id: existingCategory.id },
          data: category
        });
      } else {
        console.log(`Creating new category: ${category.name}`);
        await prisma.category.create({
          data: category
        });
      }
    }
    
    console.log('Categories import completed');
  } catch (error) {
    console.error('Error importing categories:', error);
  }
}

async function importProducts() {
  console.log('Importing products...');
  
  try {
    // Fetch products from Airtable
    const records = await base('Products').select().all();
    console.log(`Found ${records.length} products in Airtable`);
    
    // Map and import each product
    for (const record of records) {
      const fields = record.fields;
      
      // Find category by name or ID
      let categoryId = null;
      if (fields.Category && fields.Category.length > 0) {
        const categoryName = fields.Category[0];
        const category = await prisma.category.findFirst({
          where: { name: categoryName }
        });
        if (category) {
          categoryId = category.id;
        }
      }
      
      const product = {
        name: fields.Name,
        slug: fields.Slug || fields.Name.toLowerCase().replace(/\s+/g, '-'),
        description: fields.Description || null,
        price: parseFloat(fields.Price) || 0,
        images: fields.Images ? fields.Images.map(img => img.url) : [],
        stock: parseInt(fields.Stock) || 0,
        categoryId: categoryId,
        bestseller: fields.Bestseller === 'Yes' || fields.Bestseller === true
      };
      
      // Check if product already exists
      const existingProduct = await prisma.product.findUnique({
        where: { slug: product.slug }
      });
      
      if (existingProduct) {
        console.log(`Product ${product.name} already exists, updating...`);
        await prisma.product.update({
          where: { id: existingProduct.id },
          data: product
        });
      } else {
        console.log(`Creating new product: ${product.name}`);
        await prisma.product.create({
          data: product
        });
      }
    }
    
    console.log('Products import completed');
  } catch (error) {
    console.error('Error importing products:', error);
  }
}

async function importUsers() {
  console.log('Importing users...');
  
  try {
    // Fetch users from Airtable
    const records = await base('Users').select().all();
    console.log(`Found ${records.length} users in Airtable`);
    
    // Map and import each user
    for (const record of records) {
      const fields = record.fields;
      
      const user = {
        email: fields.Email,
        password: fields.Password || '$2a$12$J7ZlAjkJw4HBu.q5vGB7BexhDhxgpgZhDmM3f0XjSRv4MJ9QEgF1O', // Default hashed password: password123
        firstName: fields.FirstName || null,
        lastName: fields.LastName || null,
        role: fields.Role === 'ADMIN' ? 'ADMIN' : 'USER'
      };
      
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
      });
      
      if (existingUser) {
        console.log(`User ${user.email} already exists, updating...`);
        await prisma.user.update({
          where: { id: existingUser.id },
          data: user
        });
      } else {
        console.log(`Creating new user: ${user.email}`);
        await prisma.user.create({
          data: user
        });
      }
    }
    
    console.log('Users import completed');
  } catch (error) {
    console.error('Error importing users:', error);
  }
}

// Main import function
async function importAllData() {
  try {
    console.log('Starting data import from Airtable...');
    
    // Import in order (categories first, then products, etc.)
    await importCategories();
    await importProducts();
    await importUsers();
    
    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error during data import:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importAllData();
