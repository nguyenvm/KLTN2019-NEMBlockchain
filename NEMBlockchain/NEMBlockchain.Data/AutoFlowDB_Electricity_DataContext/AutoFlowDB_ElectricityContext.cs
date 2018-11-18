using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace NEMBlockchain.Data.AutoFlowDB_Electricity_DataContext
{
    public partial class AutoFlowDB_ElectricityContext : DbContext
    {
        public AutoFlowDB_ElectricityContext()
        {
        }

        public AutoFlowDB_ElectricityContext(DbContextOptions<AutoFlowDB_ElectricityContext> options)
            : base(options)
        {
        }

        public virtual DbSet<FunitureCategory> FunitureCategory { get; set; }
        public virtual DbSet<HistoryTrade> HistoryTrade { get; set; }
        public virtual DbSet<TargetConsumption> TargetConsumption { get; set; }
        public virtual DbSet<TradeLog> TradeLog { get; set; }
        public virtual DbSet<TradeMarket> TradeMarket { get; set; }
        public virtual DbSet<UserCategory> UserCategory { get; set; }
        public virtual DbSet<UserUsageLog> UserUsageLog { get; set; }
        public virtual DbSet<UserUsageQuickSumary> UserUsageQuickSumary { get; set; }
        public virtual DbSet<UserUsageSumary> UserUsageSumary { get; set; }
        public virtual DbSet<UserWaterAmount> UserWaterAmount { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=BIN;Database=AutoFlowDB_Electricity;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FunitureCategory>(entity =>
            {
                entity.Property(e => e.FunitureName).HasMaxLength(250);
            });

            modelBuilder.Entity<HistoryTrade>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.BuyTime).HasColumnType("datetime");

                entity.Property(e => e.BuyerId).HasMaxLength(128);

                entity.Property(e => e.TradeId).HasMaxLength(128);
            });

            modelBuilder.Entity<TargetConsumption>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId)
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.EndDay).HasColumnType("datetime");

                entity.Property(e => e.StartDay).HasColumnType("datetime");
            });

            modelBuilder.Entity<TradeLog>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.BuyTime).HasColumnType("datetime");

                entity.Property(e => e.BuyerId)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.Property(e => e.TradeId)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.HasOne(d => d.Trade)
                    .WithMany(p => p.TradeLog)
                    .HasForeignKey(d => d.TradeId)
                    .HasConstraintName("FK__TradeLog__TradeI__267ABA7A");
            });

            modelBuilder.Entity<TradeMarket>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.Amount).HasDefaultValueSql("((0))");

                entity.Property(e => e.SellTime).HasColumnType("datetime");

                entity.Property(e => e.SellerId)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.Property(e => e.Total).HasDefaultValueSql("((0))");

                entity.Property(e => e.UpdateTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<UserCategory>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.CategoryId });

                entity.Property(e => e.UserId).HasMaxLength(128);
            });

            modelBuilder.Entity<UserUsageLog>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.Flow).HasDefaultValueSql("((0))");

                entity.Property(e => e.LogTime).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("UserID")
                    .HasMaxLength(128);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.UserUsageLog)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__UserUsage__Categ__4E88ABD4");
            });

            modelBuilder.Entity<UserUsageQuickSumary>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId)
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.LatestTimeLog).HasColumnType("datetime");

                entity.Property(e => e.LatestTimeSumary).HasColumnType("datetime");

                entity.Property(e => e.StartTimeLog).HasColumnType("datetime");
            });

            modelBuilder.Entity<UserUsageSumary>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.Flow).HasDefaultValueSql("((0))");

                entity.Property(e => e.SumaryTime).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("UserID")
                    .HasMaxLength(128);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.UserUsageSumary)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__UserUsage__Categ__4F7CD00D");
            });

            modelBuilder.Entity<UserWaterAmount>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.Amount).HasDefaultValueSql("((0))");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(128);
            });
        }
    }
}
