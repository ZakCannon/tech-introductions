import Papa from "papaparse"
import * as fs from 'fs';
import * as path from "path";
import { fileURLToPath } from 'url';
import moment from "moment";

const DATE_STRING_LENGTH = 13;
const TITLE_STRING_LENGTH = 31;
const AUTHOR_STRING_LENGTH = 23;


function readFromFile(filePath, encoding) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return fs.readFileSync(path.resolve(__dirname, filePath), { encoding: encoding });
}

const csv_data = readFromFile("./resources/string_data.csv", "utf8")

const data = Papa.parse(csv_data, {delimiter: ",", header: true})

function formatTableCell(cellContent, cellWidth) {
    const contentLength = cellContent.length
    if (contentLength + 2 > cellWidth) {
        cellContent = cellContent.slice(0, cellWidth - 5)
        cellContent = `${cellContent}...`
    } else {
        cellContent = cellContent.padEnd(cellWidth - 2, " ")
    }

    return `| ${cellContent} `
}

console.log(
    "| Pub Date    |                         Title | Authors               |\n" +
    "|=====================================================================|"
)

data.data.forEach((row) => {
    const pubDate = moment(row["Publication Date"], "DD/MM/YYY");
    const pubDateCell = formatTableCell(pubDate.format("DD MMM YY"), DATE_STRING_LENGTH)
    const titleCell = formatTableCell(row["Title"], TITLE_STRING_LENGTH)
    const authorCell = formatTableCell(row["Authors"], AUTHOR_STRING_LENGTH)
    const rowString = `${pubDateCell}${titleCell}${authorCell}|`
    console.log(rowString)
})