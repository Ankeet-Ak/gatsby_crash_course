import * as React from "react"
import Link from 'gatsby-link'
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"


export default function Template({data}) {
    const post = data.markdownRemark
    return (
        <Layout>
            <Seo title="Home" />
            <div>
                <Link to="/blog">Go Back</Link>
                <hr />
                    <h1>{post.frontmatter.title}</h1>
                    <h4>
                        Posted by {post.frontmatter.author} on {post.frontmatter.date}
                    </h4>
                    <div dangerouslySetInnerHTML={{__html: post.frontmatter.html}} />
            </div>
        </Layout>
    )
}

export const postQuery = graphql`
        query BlogPostByPath($path: String!) {
            markdownRemark(frontmatter: { path: { eq: $path }}) {
                html
                frontmatter {
                    path
                    title
                    author
                    date
                }
            }
        }
`



