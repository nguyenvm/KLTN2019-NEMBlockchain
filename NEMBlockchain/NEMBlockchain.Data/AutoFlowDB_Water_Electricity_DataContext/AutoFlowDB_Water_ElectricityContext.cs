using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Electricity_DataContext
{
    public partial class AutoFlowDB_Water_ElectricityContext : DbContext
    {
        public AutoFlowDB_Water_ElectricityContext(DbContextOptions<AutoFlowDB_Water_ElectricityContext> options)
            : base(options)
        {
        }

        public virtual DbSet<FunitureCategory> FunitureCategory { get; set; }
        public virtual DbSet<HistoryTrade> HistoryTrade { get; set; }
        public virtual DbSet<TargetAlert> TargetAlert { get; set; }
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

            modelBuilder.Entity<TargetAlert>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(128)
                    .ValueGeneratedNever();

                entity.Property(e => e.CreateTime).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(128);
            });

            modelBuilder.Entity<TargetConsumption>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.Month, e.Year });

                entity.Property(e => e.UserId).HasMaxLength(128);
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
                    .HasConstraintName("FK__UserUsage__Categ__25869641");
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
                    .HasConstraintName("FK__UserUsage__Categ__267ABA7A");
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
