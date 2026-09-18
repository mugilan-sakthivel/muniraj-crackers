import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site settings', type: 'document',
  fields: [
    defineField({ name: 'businessName', title: 'Business name', type: 'string', initialValue: 'Muniraj Crackers', validation: (Rule) => Rule.required() }),
    defineField({ name: 'whatsAppNumber', title: 'WhatsApp number (country code, digits only)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'phone', title: 'Phone number', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Business address', type: 'text' }),
    defineField({ name: 'licenseNumber', title: 'Licence number', type: 'string' }),
    defineField({ name: 'hours', title: 'Business hours', type: 'string' }),
    defineField({ name: 'announcement', title: 'Announcement', type: 'string' }),
    defineField({ name: 'estimateDisclaimer', title: 'Estimate disclaimer', type: 'text' }),
  ],
})

export const category = defineType({
  name: 'category', title: 'Category', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageAlt', title: 'Image alt text', type: 'string' }),
    defineField({ name: 'sortOrder', title: 'Sort order', type: 'number', validation: (Rule) => Rule.required().integer().min(0) }),
    defineField({ name: 'enabled', title: 'Visible on website', type: 'boolean', initialValue: true }),
  ],
})

export const product = defineType({
  name: 'product', title: 'Product', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Product name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'sku', title: 'SKU', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'primaryImage', title: 'Primary image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageAlt', title: 'Image alt text', type: 'string' }),
    defineField({ name: 'packContent', title: 'Pack content', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'listPricePaise', title: 'List price (paise)', type: 'number', validation: (Rule) => Rule.required().integer().min(0) }),
    defineField({ name: 'pricePaise', title: 'Estimate price (paise)', type: 'number', validation: (Rule) => Rule.required().integer().min(0) }),
    defineField({ name: 'isAvailableForEnquiry', title: 'Available for enquiry', type: 'boolean', initialValue: true }),
    defineField({ name: 'isFeatured', title: 'Featured on home page', type: 'boolean', initialValue: false }),
    defineField({ name: 'sortOrder', title: 'Sort order', type: 'number', validation: (Rule) => Rule.required().integer().min(0) }),
    defineField({ name: 'safetyNote', title: 'Safety note', type: 'text' }),
  ],
})

export const page = defineType({
  name: 'page', title: 'Editorial page', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
  ],
})

export const enquiryItem = defineType({
  name: 'enquiryItem', title: 'Enquiry item', type: 'object',
  fields: [
    defineField({ name: 'productId', title: 'Product ID', type: 'string' }),
    defineField({ name: 'title', title: 'Product', type: 'string' }),
    defineField({ name: 'pack', title: 'Pack', type: 'string' }),
    defineField({ name: 'quantity', title: 'Quantity', type: 'number' }),
    defineField({ name: 'pricePaise', title: 'Unit price (paise)', type: 'number' }),
  ],
})

export const enquiryIntent = defineType({
  name: 'enquiryIntent', title: 'WhatsApp enquiry intents', type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Customer name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'mobile', title: 'Customer mobile', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'notes', title: 'Customer notes', type: 'text' }),
    defineField({ name: 'items', title: 'Selected items', type: 'array', of: [{ type: 'enquiryItem' }] }),
    defineField({ name: 'totalPaise', title: 'Estimated total (paise)', type: 'number' }),
    defineField({ name: 'source', title: 'Source', type: 'string' }),
    defineField({ name: 'createdAt', title: 'Clicked WhatsApp at', type: 'datetime' }),
  ],
  orderings: [{ title: 'Newest first', name: 'createdAtDesc', by: [{ field: 'createdAt', direction: 'desc' }] }],
})

export const schemaTypes = [siteSettings, category, product, page, enquiryItem, enquiryIntent]
