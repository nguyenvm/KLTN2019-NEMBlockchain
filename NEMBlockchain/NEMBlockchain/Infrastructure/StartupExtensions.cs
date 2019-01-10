using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext;
using NEMBlockchain.Data.AutoFlowDB_Water_Electricity_DataContext;
using NEMBlockchain.Data.AutoFlowDB_Water_Membership_DataContext;
using NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext;
using NEMBlockchain.Service;
using NEMBlockchain.Service.Mapping;


namespace NEMBlockchain.Infrastructure
{
    public static class StartupExtensions
    {
        public static void DefineConnectionString(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AutoFlowDB_BlockchainContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("AutoFlowDB_BlockchainEntities"))
            );

            services.AddDbContext<AutoFlowDB_Water_MembershipContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("AutoFlowDB_MembershipEntities"))
            );

            services.AddDbContext<AutoFlowDB_Water_ElectricityContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("AutoFlowDB_ElectricityEntities"))
            );

            services.AddDbContext<AutoFlowDB_Water_WaterContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("AutoFlowDB_WaterEntities"))
            );
        }

        public static void DefineAutoMapper(this IServiceCollection services)
        {
            Mapper.Initialize(cfg => {
                cfg.AddProfile<MappingProfile>();
                cfg.AddProfile<NEMBlockchain.Mapping.MappingProfile>();
            });

            //Mapper.Initialize(cfg => cfg.ValidateInlineMaps = false);
            //services.AddAutoMapper();
            services.AddSingleton(Mapper.Configuration);
            services.AddScoped<IMapper>(sp => new Mapper(sp.GetRequiredService<AutoMapper.IConfigurationProvider>(), sp.GetService));
        }

        public static void DefineScopes(this IServiceCollection services)
        {
            services.AddScoped<IMembershipService, MembershipService>();
            services.AddScoped<IBlockchainService, BlockchainService>();
            services.AddScoped<IWaterService, WaterService>();
        }
    }
}
