import fs from 'fs'

type OnFileContent = (filename: string, content: string) => void
type ReadFiles = (dirname: fs.PathLike, onFileContent: OnFileContent) => void

type Pages = {
    [key in string]: string
}

const pages: Pages = {}
const readHTMLFiles: ReadFiles = (dirname, onFileContent) => {
    console.log(dirname)
    const filenames = fs.readdirSync(dirname)

    filenames.forEach((filename) => {
        if (!filename.endsWith('.html')) return
        const content = fs.readFileSync(dirname + filename, {
            encoding: 'utf-8',
        })

        onFileContent(filename, content)
    })
}

readHTMLFiles(`${__dirname}/`, (filename, content) => {
    pages[filename] = content
})

export default pages
