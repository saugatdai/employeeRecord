const button = document.querySelector('#register');
const status = document.querySelector('#status');
const updateLinks = document.querySelectorAll('.update');
const deleteLinks = document.querySelectorAll('.delete');
const updateButton = document.querySelector('#updateButton');

const getFormDatas = () => {
    let form = document.querySelector('#registration');
    let name = form.name.value;
    let age = form.age.value;
    let gender = form.gender.value;
    let country = form.country.value;
    let comment = form.comment.value;

    return [name, age, gender, country, comment];
}

const validationTask = () => {

    const formData = getFormDatas();

    const error = [];

    if (formData[0].length === 0 || formData[1].length === 0 || formData[3].length === 0) {
        error.push('Please fill up all fields, comment is optional');
    }
    if (formData[0].length < 3) {
        error.push('Name must be three or more characters long');
    }
    if (parseInt(formData[1]) < 18 || parseInt(formData[1]) > 60) {
        error.push('Your age should be between 18 and 60');
    }
    if (!formData[2]) {
        error.push('Please select a gender');
    }
    console.log(error);

    return error;
}

if (button) {
    button.addEventListener('click', () => {
        //Extracting the form datas 
        const formDatas = getFormDatas();

        const errors = validationTask();

        if (errors.length === 0) {
            const url = '/';
            const data = {
                name: formDatas[0],
                age: formDatas[1],
                gender: formDatas[2],
                country: formDatas[3],
                comments: formDatas[4]
            };
            console.log(data);
            const otherParams = {
                headers: { "content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(data),
                method: 'post'
            };

            fetch(url, otherParams).then((response) => {
                return response.json();
            }).then(data => {
                console.log(data);
                status.innerHTML = data.message;
            }).catch(error => {
                console.log(error);
            });
        } else {
            status.innerHTML = errors[0];
        }
    });

}

if (updateButton) {
    updateButton.addEventListener('click', () => {
        const errors = validationTask();
        const formDatas = getFormDatas();

        if (errors.length === 0) {
            const url = '/';
            const data = {
                name: formDatas[0],
                age: formDatas[1],
                gender: formDatas[2],
                country: formDatas[3],
                comments: formDatas[4],
                _id: document.querySelector('#hidden').value
            };

            const otherParams = {
                headers: { "content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(data),
                method: 'put'
            };
            console.log("Now sending the patch request...");
            fetch(url, otherParams).then((response) => {
                return response.json();
            }).then(data => {
                console.log(data);
                status.innerHTML = data.message;
            }).catch(error => {
                console.log(error);
            });
        } else {
            status.innerHTML = errors[0];
        }
    });
}

if (updateLinks || deleteLinks) {
    updateLinks.forEach(updateLink => {
        updateLink.addEventListener('click', function () {
            window.location.replace(`/update?id=${this.dataset.upd}`);
        });
    });
    deleteLinks.forEach(deleteLink => {
        deleteLink.addEventListener('click', function () {
            if (confirm("Are you sure to delete?")) {
                const url = '/';
                const data = {_id: this.dataset.del};

                const otherParams = {
                    headers: { "content-type": "application/json; charset=UTF-8" },
                    body: JSON.stringify(data),
                    method: 'delete'
                };
                fetch(url, otherParams).then(response =>{
                    return response.json();
                }).then(data =>{
                    window.location.reload();
                });
            }
        });
    });
}