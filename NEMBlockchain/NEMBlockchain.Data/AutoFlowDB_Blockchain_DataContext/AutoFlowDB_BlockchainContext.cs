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
        public virtual DbSet<WaterBlockChains> WaterBlockChains { get; set; }
        public virtual DbSet<WaterBuyingBlockChains> WaterBuyingBlockChains { get; set; }
        public virtual DbSet<WaterSellingBlockChains> WaterSellingBlockChains { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=BIN;Database=AutoFlowDB_Blockchain;Trusted_Connection=True;");
//            }
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

            modelBuilder.Entity<WaterBlockChains>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.LogTime });

                entity.Property(e => e.Id).HasMaxLength(128);

                entity.Property(e => e.LogTime).HasColumnType("datetime");

                entity.Property(e => e.TransactionHash).HasMaxLength(64);
            });

            modelBuilder.Entity<WaterBuyingBlockChains>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.BuyTime });

                entity.Property(e => e.Id).HasMaxLength(128);

                entity.Property(e => e.BuyTime).HasColumnType("datetime");

                entity.Property(e => e.TransactionHash).HasMaxLength(64);
            });

            modelBuilder.Entity<WaterSellingBlockChains>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.SellTime });

                entity.Property(e => e.Id).HasMaxLength(128);

                entity.Property(e => e.SellTime).HasColumnType("datetime");

                entity.Property(e => e.TransactionHash).HasMaxLength(64);
            });
        }
    }
}
