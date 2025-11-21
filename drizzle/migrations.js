// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_chemical_siren.sql';
import m0001 from './0001_fancy_serpent_society.sql';
import m0002 from './0002_needy_ender_wiggin.sql';
import m0003 from './0003_red_molly_hayes.sql';
import m0004 from './0004_zippy_korvac.sql';
import m0005 from './0005_daily_valkyrie.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004,
m0005
    }
  }
  