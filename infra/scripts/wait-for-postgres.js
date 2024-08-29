import { exec } from 'node:child_process'

function checkPostgres() {
  exec('docker exec shopper-postgres pg_isready --host localhost', handleReturn)

  function handleReturn(error, stdout) {
    if (stdout.search('accepting connections') === -1) {
      process.stdout.write('.')
      checkPostgres()
      return
    }

    console.log('\nPostgreSQL está pronto e aceitando conexões!\n')
  }
}

process.stdout.write('\n\nAguardando PostgreSQL aceitar conexões')
checkPostgres()
