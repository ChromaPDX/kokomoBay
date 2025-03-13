import fs from 'fs';
import path from 'path';

interface TsError {
  file?: string;
  line?: number;
  column?: number;
  code: string;
  message: string;
}

function parseTsErrors(logPath: string): void {
  try {
    const logContent = fs.readFileSync(logPath, 'utf-8');
    const errorRegex = /^(.*?):(\d+):(\d+) - (error TS\d+): (.*)$/gm;
    const errors: TsError[] = [];
    const uniqueFiles = new Set<string>();

    let match: RegExpExecArray | null;
    while ((match = errorRegex.exec(logContent)) {
      const [, file, line, column, code, message] = match;
      errors.push({
        file,
        line: parseInt(line),
        column: parseInt(column),
        code,
        message
      });
      uniqueFiles.add(file);
    }

    // Print results
    console.log('TypeScript Errors:');
    errors.forEach((err, i) => {
      console.log(`${i + 1}. ${err.code} in ${err.file}:${err.line}:${err.column}`);
      console.log(`   ${err.message}\n`);
    });

    console.log('\nAffected Files:');
    uniqueFiles.forEach(file => console.log(`- ${file}`));

    console.log(`\nTotal Errors Found: ${errors.length}`);
  } catch (error) {
    console.error('Error reading or parsing the log file:', error);
    process.exit(1);
  }
}

// Get log file path from command line or use default
const logPath = process.argv[2] || path.join(__dirname, '../docs/type_errors.log');
parseTsErrors(logPath);
