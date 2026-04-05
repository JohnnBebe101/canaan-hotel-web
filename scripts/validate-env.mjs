import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');
const examplePath = path.join(rootDir, '.env.example');

console.log('🔍 Validating environment variables...');

if (!fs.existsSync(envPath)) {
    console.warn('⚠️  .env.local not found. Creating from .env.example...');
    if (fs.existsSync(examplePath)) {
        fs.copyFileSync(examplePath, envPath);
        console.log('✅ Created .env.local. Please update it with your actual credentials.');
    } else {
        console.error('❌ .env.example not found. Cannot create .env.local.');
        process.exit(1);
    }
}

const envContent = fs.readFileSync(envPath, 'utf8');
const requiredKeys = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD',
    'SESSION_SECRET'
];

let missing = [];
requiredKeys.forEach(key => {
    if (!envContent.includes(key + '=')) {
        missing.push(key);
    }
});

if (missing.length > 0) {
    console.error(`❌ Missing required keys in .env.local: ${missing.join(', ')}`);
    process.exit(1);
}

console.log('✅ Environment validation passed.');
