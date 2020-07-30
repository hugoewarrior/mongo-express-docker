module.exports = class Estudiantes {
    constructor() {
        this.sudents = [
            { name: "Hugo Guerrero", id: "8-918-1092", grade: 9.6 },
            { name: "Fulano de Tal", id: "8-918-1091", grade: 10.00 },
        ];
    }

    /**
     * Function that return all the data form local {this.sudents}
     */
    getAllStudents() {
        try {
            return { data: this.sudents, message: `Lista de estudiantes desplegada con èxito`, error: null };
        }
        catch (e) {
            return { message: `ERROR: ${e}`, error: e };
        }
    }

    /**
     * Function that creates a new student on the list
     * @param {*} student 
     */

    createStudent(student) {
        try {
            let exists = this.sudents.some((e) => e.id === student.id);
            if (exists) {
                return { data: [], message: `Lo sentimos, Estudiante ${student.id} ya existe`, error: null };
            }
            else {
                this.sudents.push(student)
                return { data: this.sudents, message: `Estudiante ${student.name} salvado con èxito`, error: null };
            }

        }
        catch (e) {
            return { message: `ERROR: ${e}`, error: e };
        }
    }

    /**
     * Function that retrieves an specific student inside {this.sudent}
     * @param {*} studentID 
     */

    getSpecificStudent(studentID) {
        try {
            let resp = this.sudents.filter((row) => row.id === studentID)
            return { data: resp, message: `Un total de ${resp.length} encontrados`, error: null };
        }
        catch (e) {
            return { message: `ERROR: ${e}`, error: e };
        }
    }

    /**
     * Function that delete an specific student inside {this.sudent}
     * @param {*} studentID 
     */

    deleteStudent(studentID) {
        try {
            this.sudents = this.sudents.filter((row) => row.id !== studentID)
            return { data: this.sudents, message: `Se ha borrado con èxito ${studentID}`, error: null };
        }
        catch (e) {
            return { message: `ERROR: ${e}`, error: e };
        }
    }

    /**
     * Function that edits values from existing student inside {this.sudent}
     * @param {*} student 
     */

    editStudent(student) {
        try {
            let index = "";
            let exists = this.sudents.some((s, i) => {
                index = i;
                return student.id === s.id
            })
            if (exists) {
                this.sudents[index] = { ...student };
                return { data: this.sudents, message: `Estudiante: ${student.id} editado con èxito`, error: null };
            }
            else {
                return { data: [], message: `Lo sentimos, Estudiante: ${student.id} no existe, por favor crearlo antes de editarlo`, error: null };
            }
        }
        catch (e) {
            return { message: `ERROR: ${e}`, error: e };
        }
    }

}
