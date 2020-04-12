const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        
        const { page = 1 } = request.query;

        const [count] = await connection('aulas').count();

        console.log(count);

        const aulas = await connection('aulas')
        .join('professores', 'professores.id', '=', 'aulas.professor_id')
        .limit(5)
        .offset((page -1) * 5)
        .select(['aulas.*', 
        'professores.name', 
        'professores.whatsapp']);

        response.header('X-Total-Count', count['count(*)'])
        
        return response.json(aulas);

    },
  
    async create(request, response){
        
        console.log(request.file)
        const { title, description } = request.body;
        console.log(title)
        const professor_id = request.headers.authorization;
        const videoName = request.file.filename;
        const url = "/home/marceloboy1/dev/HomeWod/backend/tmp"
        const [id] = await connection('aulas').insert({
            title,
            description,
            professor_id,
            videoName,
            url,
        });

        return response.json({ url, videoName});
    
    },

    async delete(request, response){

        const { id } = request.params;
        const professor_id = request.headers.authorization;


        const aula = await connection('aulas')
            .where('id', id)
            .select('professor_id')
            .first();

        if (aula.professor_id != professor_id) {

            return response.status(401).json({error: 'Operação nao permitida'});
        }

        await connection('aulas').where('id', id).delete();

        return response.status(204).send();

    }

}