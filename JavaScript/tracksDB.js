const databaseManager = {
    DBname : "tracksDB",

    initDatabase: () => {
        const request = indexedDB.open(databaseManager.DBname)
    }
}