using LibraryDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.General;
using System.Data.Entity;
using Newtonsoft.Json.Linq;

namespace WebApi.Model
{
    public class AdminUsers
    {
        public bool addUsers(Users users)
        {
            try
            { 
                using (TestJulius2Entities julius2DB = new TestJulius2Entities())
                {
                   if ((julius2DB.Users.Where(us => us.email == users.email).Count() > 0)  || (julius2DB.Users.Where(us => us.user == users.user).Count() > 0))
                    {
                        return false;
                    }

                    Users newUsers = new Users();
                    newUsers.email = users.email;
                    newUsers.user = users.user;
                    newUsers.password = Security.getEncrypt(users.password);
                    julius2DB.Users.Add(newUsers);
                    julius2DB.SaveChanges();
                }  

                return true;
            }
            catch(Exception e) {
                return false;
            }
        }

        public string getUsers(Users users)
        {
            try
            {
                using (TestJulius2Entities julius2DB = new TestJulius2Entities())
                {
                    Users oldUser = new Users();

                    string pEncrypt = Security.getEncrypt(users.password);

                    oldUser = julius2DB.Users.Where(us => us.user == users.user && us.password == pEncrypt).FirstOrDefault();

                    if(oldUser != null)
                    {
                                            
                        return Security.BuildToken(oldUser);         
                    }
                    else
                    {
                        return null;               
                    }
                }
            }
            catch (Exception e)
            {
               return null;
            }
        }

        public List<Post> addPost(Post post)
        {
            try
            {       
                using (TestJulius2Entities julius2DB = new TestJulius2Entities())
                {
                    Post newPost = new Post();
                    newPost.title = post.title;
                    newPost.images = post.images;
                    newPost.content = post.content;
                    newPost.users_id = post.users_id;
                    julius2DB.Post.Add(newPost);
                    julius2DB.SaveChanges();     

                }
                return getPost((int)post.users_id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<Post> getPost(int users_id)
        {
            try
            {
                List<Post> postList = new List<Post>();

                using (TestJulius2Entities julius2DB = new TestJulius2Entities())
                {                   
                    postList = julius2DB.Post.Where(po => po.users_id == users_id).ToList();
                }
                return postList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<Post> deletePost(int post_id)
        {
            try
            {
                int user_id;
                using (TestJulius2Entities julius2DB = new TestJulius2Entities())
                {

                    Post post = julius2DB.Post.Find(post_id);
                    user_id = (int) post.users_id;
                    julius2DB.Post.Remove(post);
                    julius2DB.SaveChanges();
                }
                return getPost(user_id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

    }
}
