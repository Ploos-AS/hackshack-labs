#!/usr/bin/env node
// Offline static policy check for the lab fixture. No credentials or Docker daemon required.
import { readFileSync } from 'node:fs';
const dir = 'labs/proton-gluetun/';
const compose = readFileSync(dir + 'compose.yaml', 'utf8');
const example = readFileSync(dir + '.env.example', 'utf8');
const gitignore = readFileSync(dir + '.gitignore', 'utf8');
const errors = [];
const check = (ok, msg) => { if (!ok) errors.push(msg); };
check(/image:\s*\$\{GLUETUN_IMAGE:\?/.test(compose), 'Gluetun image must be required env reference');
check(/image:\s*\$\{NETSHOOT_IMAGE:\?/.test(compose), 'Test image must be required env reference');
check(/network_mode:\s*["']?service:gluetun/.test(compose), 'Client must share Gluetun network');
check(/NET_ADMIN/.test(compose) && /\/dev\/net\/tun/.test(compose), 'TUN and NET_ADMIN expected');
check(!/privileged\s*:\s*true/i.test(compose), 'privileged:true forbidden');
check(!/docker\.sock/i.test(compose), 'Docker socket forbidden');
check(!/^\s*ports\s*:/m.test(compose), 'No ports may be published by lab fixture');
check(!/network_mode:\s*host/i.test(compose), 'Host network forbidden');
check(/WIREGUARD_PRIVATE_KEY:\s*\$\{WIREGUARD_PRIVATE_KEY:\?/.test(compose), 'Key must come from required environment');
for (const name of ['GLUETUN_IMAGE','NETSHOOT_IMAGE']) {
  const m = example.match(new RegExp('^' + name + '=(.+)$','m'));
  check(Boolean(m && /^[-\w./]+@sha256:(?:REPLACE_WITH_REAL_DIGEST|[a-f0-9]{64})$/.test(m[1])), name + ' must be a repository digest placeholder');
}
check(/(^|\n)\.env(\n|$)/.test(gitignore), 'Local .env must be ignored');
check(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(compose + example), 'Embedded private key forbidden');
if (errors.length) {
  for (const e of errors) console.error('FAIL: ' + e);
  process.exitCode = 1;
} else console.log('PASS: Gluetun lab static policy (no VPN test performed)');
