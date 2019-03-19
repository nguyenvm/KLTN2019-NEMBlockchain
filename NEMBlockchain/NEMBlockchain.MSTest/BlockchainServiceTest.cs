using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext;
using NEMBlockchain.Service;
using NEMBlockchain.Service.Dtos;
using NEMBlockchain.Service.Mapping;
using System.Threading.Tasks;

namespace NEMBlockchain.MSTest
{
    [TestClass]
    public class BlockchainServiceTest
    {
        private IBlockchainService _blockchainService;
        private Mock<IMapper> _mockMapper;
        private Mock<IBlockchainService> _mockService;
        private AutoFlowDB_BlockchainContext _dbContext;
        private UserBlockchainDto _userBlockchainDto;

        [TestInitialize]
        public void Initialize()
        {
            _mockMapper = new Mock<IMapper>();
            _dbContext = new AutoFlowDB_BlockchainContext();

            _blockchainService = new BlockchainService(_mockMapper.Object, _dbContext);
            _mockService = new Mock<IBlockchainService>();
        }

        [TestMethod]
        public async Task BlockchainService_InsertUserBlockchain()
        {
            _mockMapper.Setup(m => m.Map<UserBlockchainDto>(It.IsAny<UserBlockChains>())).Returns(
                    (UserBlockChains userBlockChain) =>
                    {
                        UserBlockchainDto userBlockchainDto = new UserBlockchainDto();
                        userBlockchainDto.Id = userBlockChain.Id;
                        userBlockchainDto.TransactionHash = userBlockChain.TransactionHash;

                        return userBlockchainDto;
                    }
                );

            _userBlockchainDto = new UserBlockchainDto();
            _userBlockchainDto.Id = "Test";
            _userBlockchainDto.TransactionHash = "Test";

            var result = await _blockchainService.InsertUserBlockchain(_userBlockchainDto);

            Assert.IsNotNull(result);
            Assert.AreEqual(_userBlockchainDto.Id, result.Id);
        }

        [TestMethod]
        public async Task BlockchainService_CheckExistUserBlockchain()
        {
            _mockMapper.Setup(m => m.Map<UserBlockchainDto>(It.IsAny<UserBlockChains>())).Returns(
                    (UserBlockChains userBlockChain) =>
                    {
                        UserBlockchainDto userBlockchainDto = new UserBlockchainDto();
                        userBlockchainDto.Id = userBlockChain.Id;
                        userBlockchainDto.TransactionHash = userBlockChain.TransactionHash;

                        return userBlockchainDto;
                    }
                );

            _userBlockchainDto = new UserBlockchainDto();
            _userBlockchainDto.Id = "5cf996d1-f166-495f-acc4-10f95ebc49f0";
            _userBlockchainDto.TransactionHash = "c2436260b796a5be07ac0afc9223c33b08b68a0bc0c37af55937ea47b9de4be1";

            var result = await _blockchainService.CheckExistUserBlockchain(_userBlockchainDto.Id);
            Assert.IsNotNull(result);
            Assert.AreEqual(_userBlockchainDto.Id, result.Id);

            //_mockService.Setup(s => s.CheckExistUserBlockchain(_userBlockchainDto.Id)).Returns((UserBlockchainDto userBlockchainDto) =>
            //{
            //    userBlockchainDto.Id = "5cf996d1-f166-495f-acc4-10f95ebc49f0";
            //    userBlockchainDto.TransactionHash = "c2436260b796a5be07ac0afc9223c33b08b68a0bc0c37af55937ea47b9de4be1";


            //    return null;
            //});
        }
    }
}
