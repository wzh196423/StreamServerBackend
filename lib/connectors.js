import Sequelize from 'sequelize'
const db = new Sequelize('demo','root','root',{
    host:'127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

const Camera = db.define('camera', {
    id: {type: Sequelize.INTEGER, autoIncrement: true,primaryKey: true, allowNull: false},
    model: {type: Sequelize.STRING(45)},
    brand: {type: Sequelize.STRING(45)},
    serialNumber: {type: Sequelize.STRING(45)},
    ip: {type: Sequelize.STRING(45)},
    registerTime: {type: Sequelize.DATE},
    status: {type: Sequelize.INTEGER},
    roomId: {type: Sequelize.INTEGER},
    directStreamId: {type:Sequelize.INTEGER},
}, {
    freezeTableName: true,
    tableName: 'camera',
    timestamps: false,
});

const Campus = db.define('campus', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    name: {type: Sequelize.STRING(45)},
    schoolId: {type: Sequelize.INTEGER},
}, {
    freezeTableName: true,
    tableName: 'campus',
    timestamps: false,
});

const Channel = db.define('channel', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    category: {type: Sequelize.STRING(45)},
    description: {type: Sequelize.STRING(255)},
}, {
    freezeTableName: true,
    tableName: 'channel',
    timestamps: false,
});

const DirectStream = db.define('directStream', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    url: {type: Sequelize.STRING(255)},
    status: {type: Sequelize.INTEGER},
    liveServerId: {type: Sequelize.INTEGER},
    liveRoomId: {type: Sequelize.INTEGER},
}, {
    freezeTableName: true,
    tableName: 'directStream',
    timestamps: false,
});

const LiveRoom = db.define('liveRoom', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    title: {type: Sequelize.STRING(45)},
    description: {type: Sequelize.STRING(255)},
    teacherName: {type: Sequelize.STRING(45)},
    channelId: {type: Sequelize.INTEGER},
    watchingNumber: {type: Sequelize.INTEGER},
}, {
    freezeTableName: true,
    tableName: 'liveRoom',
    timestamps: false,
});

const LiveServer = db.define('liveServer', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    port: {type: Sequelize.STRING(45)},
    maxStream: {type: Sequelize.INTEGER},
    serverId: {type: Sequelize.INTEGER},
    rootServerId: {type: Sequelize.INTEGER},
}, {
    freezeTableName: true,
    tableName: 'liveServer',
    timestamps: false,
});

const Room = db.define('room', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    name: {type: Sequelize.STRING(45)},
    campusId: {type: Sequelize.INTEGER},
}, {
    freezeTableName: true,
    tableName: 'room',
    timestamps: false,
});

const RootServer = db.define('rootServer', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    serverId: {type: Sequelize.INTEGER},
    port: {type: Sequelize.STRING(45)},
}, {
    freezeTableName: true,
    tableName: 'rootServer',
    timestamps: false,
});

const School = db.define('school', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    name: {type: Sequelize.STRING(45)},
}, {
    freezeTableName: true,
    tableName: 'school',
    timestamps: false,
});

const Server = db.define('server', {
    id: {type: Sequelize.INTEGER, autoIncrement: true,primaryKey: true, allowNull: false},
    ip: {type: Sequelize.STRING(45)},
    brand: {type: Sequelize.STRING(45)},
    registerTime: {type: Sequelize.DATE},
    description: {type: Sequelize.STRING(255)},
    storage: {type: Sequelize.DECIMAL(5,2)},
    usedStorage: {type: Sequelize.DECIMAL(5,2)},
    cores: {type: Sequelize.INTEGER},
    memory: {type: Sequelize.INTEGER},
    roomId: {type:Sequelize.INTEGER},
}, {
    freezeTableName: true,
    tableName: 'server',
    timestamps: false,
});

export {Camera, RootServer, Server, LiveServer, LiveRoom, Campus, Channel, DirectStream, Room, db, School}