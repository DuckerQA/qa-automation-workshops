import { exec } from 'child_process';
import fs from 'fs';

const reportPath = 'tests/smart-report.html';

if (fs.existsSync(reportPath)) {
  exec(`start "" "${reportPath}"`);
}
