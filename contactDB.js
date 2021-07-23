class ContactDB {

    dbName = "contacts"
    contacts = {}

    write(record)
    {
        this.load()

        this.contacts[record.email.toLowerCase()] = record;
    
        console.group("==== contactDB ====")
        console.log(this.contacts)
        console.groupEnd()
        localStorage.setItem(this.dbName, JSON.stringify(this.contacts))
    }



    load()
    {
        if (this.contacts = localStorage.getItem(this.dbName))
            this.contacts = JSON.parse(this.contacts);
        else 
            this.contacts = {}
    }
}