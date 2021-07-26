class ContactDB {

    dbName = "contacts"
    contacts = {}
    
    search(keyword)
    {
        var keywordRE = new RegExp(keyword, 'i')
        var results = {}

        for(var email in this.contacts)
        {
            var curContact = this.contacts[email]
            
            if (keywordRE.test(email))
                results[email] = curContact

            for(var field in curContact)
            {
                var value = curContact[field]
                if (keywordRE.test(value))
                    results[email] = curContact
            }
        }

        return results
    }


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
        this.contacts = {}

        if (this.contacts = localStorage.getItem(this.dbName))
        {
            this.contacts = JSON.parse(this.contacts);
            return true;
        }
            
        return false;
    }
}