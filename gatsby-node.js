const path = require("path")

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`src/templates/blog-post.js`)

  // Query for markdown nodes to use in creating pages.
  return graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              html
              id
              frontmatter {
                path 
                title
                date
                author
              }
            }
          }
        }
      }
    `
  ).then(res => {
    if(res.errors) {
      return Promise.reject(res.errors);
    }
  // Create pages for each markdown file.
     res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
      path: node.frontmatter.path,
      component: postTemplate,
    })
  })
  })
}
