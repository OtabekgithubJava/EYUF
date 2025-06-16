using System;

namespace HashPassword
{
    class Program
    {
        static void Main(string[] args)
        {
            string pwd = "alisher123";
            string hash_pwd = BCrypt.Net.BCrypt.EnhancedHashPassword(pwd);

            Console.WriteLine($"{pwd} va {hash_pwd} tekshirilyapti...");

            Console.WriteLine(BCrypt.Net.BCrypt.EnhancedVerify(pwd, hash_pwd));
        }
    }
}