import * as csv from 'csv-stream';
import { open } from 'node:fs/promises';
import * as pe from 'post-entity';
import { removeStopwords } from 'stopword';

const file = process.argv[2] || '';
const filter = parseInt(process.argv[3] || '5');

if (file === '') {
  throw new RangeError();
}

const tokens = {};
// Initialize the parser
const options = {
  delimiter: '\t',
  endLine: '\n',
  columnOffset: 0,
  escapeChar: '"',
  enclosedChar: '"',
};

const csvStream = csv.createStream(options);

let prompt = `Using a list of words where the number after the comma is how frequently the word is used, please summarize the personality, interests, fears, and hopes of the person using these words from the list (and account for frequency): 

`;

const alphanumOnly = /[^a-z\-]/g;

/**
 *
 */
async function main() {
  const fd = await open(file, 'r');
  const stream = fd.createReadStream();
  stream
    .pipe(csvStream)

    .on('data', function (data) {
      // outputs an object containing a set of key/value pair representing a line found in the csv file.
      if (data.retweet !== 'False') {
        return;
      }

      if (data.language !== 'en') {
        return;
      }
      const tweet = data.tweet.toLowerCase();

      const text = pe
        .process(tweet)
        .filter((tweet) => tweet.type === 'text')
        .map((tweet) => tweet.raw.trim());

      for (const words of text) {
        const split = removeStopwords(words.split(' '));
        for (const element of split) {
          const token = element.trim().replace(alphanumOnly, '');

          if (token !== '') {
            if (tokens[token] === undefined) {
              tokens[token] = 0;
            }
            tokens[token] += 1;
          }
        }
      }
    })

    .on('close', function () {
      const keys = Object.keys(tokens);

      for (const key of keys) {
        if (tokens[key] < filter) {
          continue;
        }
        prompt += `${key}:${tokens[key]} `;
      }

      console.log(prompt);
    });
}

main();
