import { Options } from '@mikro-orm/core';
import { Winkel } from './entities/Winkel.entity';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const config: Options = {
    entities: [ "dist/entities/**/*.js" ],
    entitiesTs: [ "src/entities/**/*.ts" ],
    seeder: {
        // path: 'dist/seeders',
        // pathTs: '.src/seeders',
        // glob: '!(*.d).{js,ts}',
    },
    dbName: './data/eventus.db',
    type: 'sqlite',     
    highlighter: new SqlHighlighter(),
    baseDir: process.cwd(),
    debug: false,
};

export default config;

//TODO FOREIGN KEY constraint failed -> fix
//TODO fix relations between Event -> Dienst/product en Event -> Pakket
//TODO Make seeding work? this is just for testing but yknow lazy
