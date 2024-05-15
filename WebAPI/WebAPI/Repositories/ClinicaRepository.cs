using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        public VitalContext ctx = new VitalContext();

        public Clinica BuscarPorId(Guid id)
        {

            Clinica clinica = ctx.Clinicas.Include(x => x.Endereco).FirstOrDefault(x => x.Id == id)!;

            return clinica;
            
        }

        public void Cadastrar(Clinica clinica)
        {
            ctx.Clinicas.Add(clinica);
            ctx.SaveChanges();
        }

        public List<Clinica> Listar()
        {
            return ctx.Clinicas
                .Select(c => new Clinica
                {
                    Id = c.Id,
                    NomeFantasia = c.NomeFantasia,
                    Endereco = c.Endereco
                })
                .ToList();
        }

        public List<Clinica> ListarEnderecosClinicas()
        {
            var listaClinicasCidades = ctx.Clinicas.Where(x => ctx.Enderecos.Any(y => y.Id == x.EnderecoId)).Select(x => new Clinica
            {
                EnderecoId = x.EnderecoId,
                Endereco = new Endereco
                {
                    Cidade = x.Endereco!.Cidade,
                }
            }).Distinct().ToList();


            return listaClinicasCidades;
        }

        public List<Clinica> ListarPorCidade(string cidade)
        {
            return ctx.Clinicas
                .Select(c => new Clinica
                {
                    Id = c.Id,
                    NomeFantasia = c.NomeFantasia,
                    Endereco = c.Endereco
                })
                
               .Where(c => c.Endereco!.Cidade == cidade)
                .ToList();
        }

    }
}
