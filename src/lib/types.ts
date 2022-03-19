export enum Events {
    /** 小地图插件注册 */
    PluginMinimapRegister = "PluginMinimapRegister",
    /**  网格线注册 */
    PluginGridRegister = "PluginGridRegister",
    /** 编辑工具注册 */
    PluginToolbarRegister = "PluginToolbarRegister",

    /** 切换模式 */
    GraphModeChange = "GraphModeChange",

    /** 数据刷新 */
    DataRefresh = "DataRefresh",

    /** 添加节点 */
    NodeAdd = "NodeAdd",
    /** 添加节点并且进行屏幕坐标转换 */
    NodeAddPx = "NodeAddPx",


    /** 添加线 */
    EdgeAdd = "EdgeAdd"
}

export enum NodeEvent {
    Mouseenter = "mouseenter",
}

export enum CustomAttr {
    BType = "btype",
    UUID = "uuid"
}

export enum ShapeType {
    CustomGroup = "CustomGroup",
    CustomShape = "CustomShape",

    AnchorInPoint = "AnchorInPoint",
    AnchorOutPoint = "AnchorOutPoint",
}

export enum GraphMode {
    Default = "default",
    EditEdge = "edit-edge",
}

export enum GraphBehavior {
    AddEdge = "AddEdge",
    HoverNode = "HoverNode"
}


export interface INode {
    name: string // 节点名称
    type: string // 节点类型
    background?: any // 节点背景图片
    size: number[] // 节点大小
    inPoints?: number[][] // 连入节点
    outPoints?: number[][] // 连出节点
}