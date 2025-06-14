/**
 * @typedef {Object} User
 * @property {string} id - User unique identifier
 * @property {string} username - User's username
 * @property {string} email - User's email address
 * @property {'user' | 'admin'} role - User's role in the system
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} Article
 * @property {string} id - Article unique identifier
 * @property {string} title - Article title
 * @property {string} content - Article full content
 * @property {string} excerpt - Short summary of the article
 * @property {string} slug - URL-friendly identifier
 * @property {string} categoryId - ID of the category this article belongs to
 * @property {Category} [category] - Optional category object
 * @property {string} authorId - ID of the author
 * @property {User} [author] - Optional author object
 * @property {'draft' | 'published'} status - Publication status
 * @property {string} [publishedAt] - Publication timestamp (optional)
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {string[]} tags - Array of tag strings
 * @property {string} [imageUrl] - Optional featured image URL
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Category unique identifier
 * @property {string} name - Category display name
 * @property {string} slug - URL-friendly identifier
 * @property {string} [description] - Optional category description
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} PaginationMeta
 * @property {number} currentPage - Current page number
 * @property {number} totalPages - Total number of pages
 * @property {number} totalItems - Total number of items across all pages
 * @property {number} itemsPerPage - Number of items per page
 * @property {boolean} hasNextPage - Whether there is a next page
 * @property {boolean} hasPrevPage - Whether there is a previous page
 */

/**
 * @typedef {Object} ArticleFilters
 * @property {string} search - Search term
 * @property {string} categoryId - Filter by category ID
 * @property {'all' | 'draft' | 'published'} status - Filter by article status
 * @property {'newest' | 'oldest' | 'title'} sortBy - Sort order
 * @property {number} page - Page number
 * @property {number} limit - Items per page
 */
