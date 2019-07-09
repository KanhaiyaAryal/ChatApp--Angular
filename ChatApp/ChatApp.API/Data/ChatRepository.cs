using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.API.Data
{
    public class ChatRepository : IChatRepository
    {
        private readonly DataContext _context;
        public ChatRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public Task<Photo> GetMainPhotoForUser(int userId)
        {
            return _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public Task<Photo> GetPhoto(int id)
        {
            var photo = _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}