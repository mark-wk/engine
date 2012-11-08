pc.extend(pc.fw, function () {
    /**
    * @component
    * @name pc.fw.CameraComponent
    * @class The Camera Component enables an Entity to render the scene.
    * @constructor Create a new Camera Component
    * @param {pc.fw.CameraComponentSystem} system The ComponentSystem that created this Component
    * @param {pc.fw.Entity} entity The Entity that this Component is attached to.
    * @extends pc.fw.Component
    * @property {pc.scene.Camera} camera The {@link pc.scene.CameraNode} used to render the scene
    * @property {String} clearColor The color used to clear the canvas to before the camera starts to render
    * @property {Number} nearClip The distance from the camera before which no rendering will take place
    * @property {Number} farClip The distance from the camera after which no rendering will take place
    * @property {Number} fov The Y-axis field of view of the camera, in degrees. Used for {@link pc.scene.Projection.PERSPECTIVE} cameras only. Defaults to 45.
    * @property {Number} orthoHeight The half-height of the orthographic view window (in the Y-axis). Used for {@link pc.scene.Projection.ORTHOGRAPHIC} cameras only. Defaults to 10.
    * @property {Number} aspectRatio The aspect ratio of the camera. This is the ratio of width divided by height. Default to 16/9.
    * @property {pc.scene.Projection} projection The type of projection used to render the camera.
    * @property {Boolean} activate Activate on load. If true the {@link pc.fw.CameraComponentSystem} will set {@link pc.fw.CameraComponentSystem#current} to this camera as soon as it is loaded.
    * @property {Boolean} offscreen Render offscreen. If true, the camera will render to an offscreen buffer.
    */
    var CameraComponent = function CameraComponent(system, entity) {
        // Bind event to update hierarchy if camera node changes
        this.bind("set_camera", this.onSetCamera.bind(this));
        this.bind("set_clearColor", this.onSetClearColor.bind(this));
        this.bind("set_fov", this.onSetFov.bind(this));
        this.bind("set_orthoHeight", this.onSetOrthoHeight.bind(this));
        this.bind("set_nearClip", this.onSetNearClip.bind(this));
        this.bind("set_farClip", this.onSetFarClip.bind(this));
        this.bind("set_projection", this.onSetProjection.bind(this));
    };
    CameraComponent = pc.inherits(CameraComponent, pc.fw.Component);

    pc.extend(CameraComponent.prototype, {
        onSetCamera: function (name, oldValue, newValue) {
            // remove old camera node from hierarchy and add new one
            if (oldValue) {
                this.entity.removeChild(oldValue);
            }        
            this.entity.addChild(newValue);
        },
        onSetClearColor: function (name, oldValue, newValue) {
            var color = parseInt(newValue);
            this.data.camera.getClearOptions().color = [
                ((color >> 24) & 0xff) / 255.0,
                ((color >> 16) & 0xff) / 255.0,
                ((color >> 8) & 0xff) / 255.0,
                ((color) & 0xff) / 255.0
            ];
        },
        onSetFov: function (name, oldValue, newValue) {
            this.data.camera.setFov(newValue);
        },
        onSetOrthoHeight: function (name, oldValue, newValue) {
            this.data.camera.setOrthoHeight(newValue);
        },
        onSetNearClip: function (name, oldValue, newValue) {
            this.data.camera.setNearClip(newValue);
        },
        onSetFarClip: function (name, oldValue, newValue) {
            this.data.camera.setFarClip(newValue);
        },
        onSetProjection: function (name, oldValue, newValue) {
            this.data.camera.setProjection(newValue);
        }
    });

    

    return {
        CameraComponent: CameraComponent
    }; 
}());
