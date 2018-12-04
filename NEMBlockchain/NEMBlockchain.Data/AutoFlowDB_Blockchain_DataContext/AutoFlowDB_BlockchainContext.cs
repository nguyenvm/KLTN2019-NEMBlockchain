using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext
{
    public partial class AutoFlowDB_BlockchainContext : DbContext
    {
        public AutoFlowDB_BlockchainContext(DbContextOptions<AutoFlowDB_BlockchainContext> options)
            : base(options)
        {
        }

        public virtual DbSet<UserBlockChains> UserBlockChains { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserBlockChains>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.TransactionHash).HasMaxLength(64);
            });
        }
    }
}
