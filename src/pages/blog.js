import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"


import Layout from "../components/layout"
import Seo from "../components/seo"


export default function BlogPage() {
  return (
    <StaticQuery
      query={graphql`
      query BlogIndexQuery {
        allMarkdownRemark {
            edges {
                node {
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
      `}
      render={data => (
        <Layout>
    <Seo title="Home" />
    <h1>Latest Post</h1>
    {data.allMarkdownRemark.edges.map(post => (
        <div key={post.node.id}>
            <h3>{post.node.frontmatter.title}</h3>
            <small>Posted by {post.node.frontmatter.author} on {post.node.frontmatter.date}</small>
            <br />
            <br />
            <Link to={post.node.frontmatter.path}>Read More</Link>
            <br />
            <br />
            <hr />
        </div>
    ))}
  </Layout>
      )}
    />
  )
}