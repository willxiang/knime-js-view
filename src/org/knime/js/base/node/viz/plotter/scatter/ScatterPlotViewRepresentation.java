/*
 * ------------------------------------------------------------------------
 *
 *  Copyright by KNIME AG, Zurich, Switzerland
 *  Website: http://www.knime.com; Email: contact@knime.com
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License, Version 3, as
 *  published by the Free Software Foundation.
 *
 *  This program is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, see <http://www.gnu.org/licenses>.
 *
 *  Additional permission under GNU GPL version 3 section 7:
 *
 *  KNIME interoperates with ECLIPSE solely via ECLIPSE's plug-in APIs.
 *  Hence, KNIME and ECLIPSE are both independent programs and are not
 *  derived from each other. Should, however, the interpretation of the
 *  GNU GPL Version 3 ("License") under any applicable laws result in
 *  KNIME and ECLIPSE being a combined program, KNIME AG herewith grants
 *  you the additional permission to use and propagate KNIME together with
 *  ECLIPSE with only the license terms in place for ECLIPSE applying to
 *  ECLIPSE and the GNU GPL Version 3 applying for KNIME, provided the
 *  license terms of ECLIPSE themselves allow for the respective use and
 *  propagation of ECLIPSE together with KNIME.
 *
 *  Additional permission relating to nodes for KNIME that extend the Node
 *  Extension (and in particular that are based on subclasses of NodeModel,
 *  NodeDialog, and NodeView) and that only interoperate with KNIME through
 *  standard APIs ("Nodes"):
 *  Nodes are deemed to be separate and independent programs and to not be
 *  covered works.  Notwithstanding anything to the contrary in the
 *  License, the License does not apply to Nodes, you are not required to
 *  license Nodes under the License, and you are granted a license to
 *  prepare and propagate Nodes, in each case even if such Nodes are
 *  propagated with or for interoperation with KNIME. The owner of a Node
 *  may freely choose the license terms applicable to such Node, including
 *  when such Node is propagated with or for interoperation with KNIME.
 * ------------------------------------------------------------------------
 *
 * History
 *   13.05.2014 (Christian Albrecht, KNIME AG, Zurich, Switzerland): created
 */
package org.knime.js.base.node.viz.plotter.scatter;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.knime.core.node.InvalidSettingsException;
import org.knime.core.node.NodeSettingsRO;
import org.knime.core.node.NodeSettingsWO;
import org.knime.js.core.JSONViewContent;
import org.knime.js.core.datasets.JSONKeyedValues2DDataset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

/**
 *
 * @author Christian Albrecht, KNIME AG, Zurich, Switzerland, University of Konstanz
 */
@JsonAutoDetect
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
public class ScatterPlotViewRepresentation extends JSONViewContent {

    private JSONKeyedValues2DDataset m_keyedDataset;
    private boolean m_enableViewConfiguration;
    private boolean m_enableTitleChange;
    private boolean m_enableSubtitleChange;
    private boolean m_enableXColumnChange;
    private boolean m_enableYColumnChange;
    private boolean m_enableXAxisLabelEdit;
    private boolean m_enableYAxisLabelEdit;
    private boolean m_enableDotSizeChange;
    private boolean m_enableZooming;
    private boolean m_enableDragZooming;
    private boolean m_enablePanning;
    private boolean m_showZoomResetButton;


    /**
     * @return the keyedDataset
     */
    public JSONKeyedValues2DDataset getKeyedDataset() {
        return m_keyedDataset;
    }

    /**
     * @param keyedDataset the keyedDataset to set
     */
    public void setKeyedDataset(final JSONKeyedValues2DDataset keyedDataset) {
        m_keyedDataset = keyedDataset;
    }

    /**
     * @return the allowViewConfiguration
     */
    public boolean getEnableViewConfiguration() {
        return m_enableViewConfiguration;
    }

    /**
     * @param enableViewConfiguration the allowViewConfiguration to set
     */
    public void setEnableViewConfiguration(final boolean enableViewConfiguration) {
        m_enableViewConfiguration = enableViewConfiguration;
    }

    /**
     * @return the enableTitleChange
     */
    public boolean getEnableTitleChange() {
        return m_enableTitleChange;
    }

    /**
     * @param enableTitleChange the enableTitleChange to set
     */
    public void setEnableTitleChange(final boolean enableTitleChange) {
        m_enableTitleChange = enableTitleChange;
    }

    /**
     * @return the enableSubtitleChange
     */
    public boolean getEnableSubtitleChange() {
        return m_enableSubtitleChange;
    }

    /**
     * @param enableSubtitleChange the enableSubtitleChange to set
     */
    public void setEnableSubtitleChange(final boolean enableSubtitleChange) {
        m_enableSubtitleChange = enableSubtitleChange;
    }

    /**
     * @return the enableXColumnChange
     */
    public boolean getEnableXColumnChange() {
        return m_enableXColumnChange;
    }

    /**
     * @param enableXColumnChange the enableXColumnChange to set
     */
    public void setEnableXColumnChange(final boolean enableXColumnChange) {
        m_enableXColumnChange = enableXColumnChange;
    }

    /**
     * @return the enableYColumnChange
     */
    public boolean getEnableYColumnChange() {
        return m_enableYColumnChange;
    }

    /**
     * @param enableYColumnChange the enableYColumnChange to set
     */
    public void setEnableYColumnChange(final boolean enableYColumnChange) {
        m_enableYColumnChange = enableYColumnChange;
    }

    /**
     * @return the enableXAxisLabelEdit
     */
    public boolean getEnableXAxisLabelEdit() {
        return m_enableXAxisLabelEdit;
    }

    /**
     * @param enableXAxisLabelEdit the enableXAxisLabelEdit to set
     */
    public void setEnableXAxisLabelEdit(final boolean enableXAxisLabelEdit) {
        m_enableXAxisLabelEdit = enableXAxisLabelEdit;
    }

    /**
     * @return the enableYAxisLabelEdit
     */
    public boolean getEnableYAxisLabelEdit() {
        return m_enableYAxisLabelEdit;
    }

    /**
     * @param enableYAxisLabelEdit the enableYAxisLabelEdit to set
     */
    public void setEnableYAxisLabelEdit(final boolean enableYAxisLabelEdit) {
        m_enableYAxisLabelEdit = enableYAxisLabelEdit;
    }

    /**
     * @return the allowDotSizeChange
     */
    public boolean getEnableDotSizeChange() {
        return m_enableDotSizeChange;
    }

    /**
     * @param enableDotSizeChange the allowDotSizeChange to set
     */
    public void setEnableDotSizeChange(final boolean enableDotSizeChange) {
        m_enableDotSizeChange = enableDotSizeChange;
    }

    /**
     * @return the allowZooming
     */
    public boolean getEnableZooming() {
        return m_enableZooming;
    }

    /**
     * @param enableZooming the allowZooming to set
     */
    public void setEnableZooming(final boolean enableZooming) {
        m_enableZooming = enableZooming;
    }

    /**
     * @return the enableDragZooming
     */
    public boolean getEnableDragZooming() {
        return m_enableDragZooming;
    }

    /**
     * @param enableDragZooming the enableDragZooming to set
     */
    public void setEnableDragZooming(final boolean enableDragZooming) {
        m_enableDragZooming = enableDragZooming;
    }

    /**
     * @return the allowPanning
     */
    public boolean getEnablePanning() {
        return m_enablePanning;
    }

    /**
     * @param enablePanning the allowPanning to set
     */
    public void setEnablePanning(final boolean enablePanning) {
        m_enablePanning = enablePanning;
    }

    /**
     * @return the showZoomResetButton
     */
    public boolean getShowZoomResetButton() {
        return m_showZoomResetButton;
    }

    /**
     * @param showZoomResetButton the showZoomResetButton to set
     */
    public void setShowZoomResetButton(final boolean showZoomResetButton) {
        m_showZoomResetButton = showZoomResetButton;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void saveToNodeSettings(final NodeSettingsWO settings) {
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_CONFIG, getEnableViewConfiguration());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_TTILE_CHANGE, getEnableTitleChange());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_SUBTTILE_CHANGE, getEnableSubtitleChange());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_X_COL_CHANGE, getEnableXColumnChange());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_Y_COL_CHANGE, getEnableYColumnChange());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_X_LABEL_EDIT, getEnableXAxisLabelEdit());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_Y_LABEL_EDIT, getEnableYAxisLabelEdit());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_DOT_SIZE_CHANGE, getEnableDotSizeChange());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_ZOOMING, getEnableZooming());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_DRAG_ZOOMING, getEnableDragZooming());
        settings.addBoolean(ScatterPlotViewConfig.ENABLE_PANNING, getEnablePanning());
        settings.addBoolean(ScatterPlotViewConfig.SHOW_ZOOM_RESET_BUTTON, getShowZoomResetButton());
        settings.addBoolean("hasDataset", m_keyedDataset != null);
        if (m_keyedDataset != null) {
            NodeSettingsWO datasetSettings = settings.addNodeSettings("dataset");
            m_keyedDataset.saveToNodeSettings(datasetSettings);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void loadFromNodeSettings(final NodeSettingsRO settings) throws InvalidSettingsException {
        setEnableViewConfiguration(settings.getBoolean(ScatterPlotViewConfig.ENABLE_CONFIG));
        setEnableTitleChange(settings.getBoolean(ScatterPlotViewConfig.ENABLE_TTILE_CHANGE));
        setEnableSubtitleChange(settings.getBoolean(ScatterPlotViewConfig.ENABLE_SUBTTILE_CHANGE));
        setEnableXColumnChange(settings.getBoolean(ScatterPlotViewConfig.ENABLE_X_COL_CHANGE));
        setEnableYColumnChange(settings.getBoolean(ScatterPlotViewConfig.ENABLE_Y_COL_CHANGE));
        setEnableXAxisLabelEdit(settings.getBoolean(ScatterPlotViewConfig.ENABLE_X_LABEL_EDIT));
        setEnableYAxisLabelEdit(settings.getBoolean(ScatterPlotViewConfig.ENABLE_Y_LABEL_EDIT));
        setEnableDotSizeChange(settings.getBoolean(ScatterPlotViewConfig.ENABLE_DOT_SIZE_CHANGE));
        setEnableZooming(settings.getBoolean(ScatterPlotViewConfig.ENABLE_ZOOMING));
        setEnableDragZooming(settings.getBoolean(ScatterPlotViewConfig.ENABLE_DRAG_ZOOMING));
        setEnablePanning(settings.getBoolean(ScatterPlotViewConfig.ENABLE_PANNING));
        setShowZoomResetButton(settings.getBoolean(ScatterPlotViewConfig.SHOW_ZOOM_RESET_BUTTON));
        m_keyedDataset = null;
        boolean hasDataset = settings.getBoolean("hasDataset");
        if (hasDataset) {
            NodeSettingsRO datasetSettings = settings.getNodeSettings("dataset");
            m_keyedDataset = new JSONKeyedValues2DDataset();
            m_keyedDataset.loadFromNodeSettings(datasetSettings);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean equals(final Object obj) {
        if (obj == null) {
            return false;
        }
        if (obj == this) {
            return true;
        }
        if (obj.getClass() != getClass()) {
            return false;
        }
        ScatterPlotViewRepresentation other = (ScatterPlotViewRepresentation)obj;
        return new EqualsBuilder()
                .append(m_keyedDataset, other.m_keyedDataset)
                .append(m_enableViewConfiguration, other.m_enableViewConfiguration)
                .append(m_enableTitleChange, other.m_enableTitleChange)
                .append(m_enableSubtitleChange, other.m_enableSubtitleChange)
                .append(m_enableXColumnChange, other.m_enableXColumnChange)
                .append(m_enableYColumnChange, other.m_enableYColumnChange)
                .append(m_enableXAxisLabelEdit, other.m_enableXAxisLabelEdit)
                .append(m_enableYAxisLabelEdit, other.m_enableYAxisLabelEdit)
                .append(m_enableDotSizeChange, other.m_enableDotSizeChange)
                .append(m_enableZooming, other.m_enableZooming)
                .append(m_enableDragZooming, other.m_enableDragZooming)
                .append(m_enablePanning, other.m_enablePanning)
                .append(m_showZoomResetButton, other.m_showZoomResetButton)
                .isEquals();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(m_keyedDataset)
                .append(m_enableViewConfiguration)
                .append(m_enableTitleChange)
                .append(m_enableSubtitleChange)
                .append(m_enableXColumnChange)
                .append(m_enableYColumnChange)
                .append(m_enableXAxisLabelEdit)
                .append(m_enableYAxisLabelEdit)
                .append(m_enableDotSizeChange)
                .append(m_enableZooming)
                .append(m_enableDragZooming)
                .append(m_enablePanning)
                .append(m_showZoomResetButton)
                .toHashCode();
    }
}
