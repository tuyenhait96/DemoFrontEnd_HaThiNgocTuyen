class render {
    static handleClearList (domList) {
        domList.innerHTML = ''
    }
    static showListOfUsers(data, parentNode) {
        const URL = {
            protocol: window.location.protocol,
            pathName: window.location.pathname,
            hostName: window.location.hostname
        }
        let content = ''
        data.map( item => {
        content += `<tr><td class="text-center">${item['id']}</td>`
        content += `<td>${item['name']}</td>`
        content += `<td>${item['birth']}</td>`
        content += `<td><a href="${URL.pathName}detail?id=${item['id']}" class="btn btn-secondary mr-5">Detail</a>
                        <a href="${URL.pathName}edit?id=${item['id']}" class="btn btn-warning mr-5">Edit</a>
                        <button class="btn btn-danger" onClick='deleteUser(this)' idUser="${item['id']}">Delete</button></td>
                       </tr>`
        })
        parentNode.innerHTML = ''
        parentNode.innerHTML = content

    }
    static handleDeleteUser (id, data) {
        return data.filter( d => {
            if(d.id !== id)
                return d
        })
    }
    static handleClickDelete (id, data, func) {
        let listUsers = this.handleDeleteUser(id, data) // new array
        func(listUsers)
    }
}
